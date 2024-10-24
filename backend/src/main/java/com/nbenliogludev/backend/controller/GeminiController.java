package com.nbenliogludev.backend.controller;

import com.nbenliogludev.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GeminiController {

    @Autowired
    GeminiService geminiService;

    @PostMapping("/chat")
    public String chat(@RequestBody String prompt) {
        return this.geminiService.chat(prompt);
    }

}