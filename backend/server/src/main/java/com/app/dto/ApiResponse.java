package com.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//DTO :  resp DTO : to send API resp from rest server ---> rest clnt

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
	private LocalDateTime timeStamp;
	private String message;
	public ApiResponse(String message) {
		super();
		this.message = message;
		this.timeStamp=LocalDateTime.now();
	}
	
}
