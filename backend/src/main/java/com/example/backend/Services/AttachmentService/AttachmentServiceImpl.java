package com.example.backend.Services.AttachmentService;

import com.example.backend.Entity.Attachment;
import com.example.backend.Repository.AttachmentRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttachmentServiceImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;

    public HttpEntity<?> saveFile(MultipartFile file, String prefix) throws IOException {
        UUID photoId = UUID.randomUUID();
        attachmentRepository.save(generateAttachment(file, prefix, photoId));
        String outPutStream = "Files" + prefix + "/" + photoId + ":" + file.getOriginalFilename();
        FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(outPutStream));
        return ResponseEntity.ok(photoId);
    }

    private static Attachment generateAttachment(MultipartFile file, String prefix, UUID photoId) {
        String name = photoId + ":" + file.getOriginalFilename();
        return Attachment.builder()
                .id(photoId)
                .prefix(prefix)
                .name(name)
                .build();
    }

    @Override
    public HttpEntity<?> getFile(UUID id, HttpServletResponse response) throws IOException {
        Attachment attachment = attachmentRepository.findById(id).orElseThrow();
        System.out.println(attachment.getName() + "a");

        String contentType = getContentType(attachment.getName());
        response.setContentType(contentType);
        String inputStream = "Files" + attachment.getPrefix() + "/" + attachment.getName();
        FileCopyUtils.copy(new FileInputStream(inputStream), response.getOutputStream());
        return ResponseEntity.ok(attachment.getId());
    }

    private String getContentType(String fileName) {
        if (fileName.endsWith(".pdf")) {
            return "application/pdf";
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (fileName.endsWith(".png")) {
            return "image/png";
        } else {
            return "application/octet-stream";
        }
    }
}
