package com.nbenliogludev.backend.controller;

import com.nbenliogludev.backend.dto.GenerateContentRequest;
import com.nbenliogludev.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GeminiController {

    @Autowired
    GeminiService geminiService;

    @PostMapping("/generateContent")
    public String generateContent(@RequestBody GenerateContentRequest request) {
        return geminiService.generateContent(
                request.getMainCategory(),
                request.getInnerCategory(),
                request.getAge(), // Convert int to String
                request.getDetail(),
                request.getAdditionalInfo()
        );
    }
}
