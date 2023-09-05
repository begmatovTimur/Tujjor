package com.example.backend.Services.AttachmentService;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.UUID;

public interface AttachmentService {

    HttpEntity<?> saveFile(MultipartFile file, String prefix) throws IOException;

    HttpEntity<?> getFile(UUID id, HttpServletResponse response) throws IOException;
}
