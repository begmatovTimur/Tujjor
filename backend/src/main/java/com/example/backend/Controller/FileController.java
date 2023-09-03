package com.example.backend.Controller;

import com.example.backend.Services.AttachmentService.AttachmentService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {

    private final AttachmentService attachmentService;

    @PostMapping("/upload")
    public HttpEntity<?> SaveFile(@RequestBody MultipartFile file, @RequestParam String prefix) throws IOException {
        return attachmentService.saveFile(file,prefix);
    }

    @GetMapping("getFile/{id}")
    public HttpEntity<?> getFile(@PathVariable UUID id, HttpServletResponse response) throws IOException {
        return attachmentService.getFile(id,response);
    }
}
