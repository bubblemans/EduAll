package com.example.springBoot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicateResourceFoundException extends RuntimeException{
    /**
     * Default serial ID defined below
     */
    private static final long serialVersionUID = 1L;
    public DuplicateResourceFoundException (String message){super(message);}

}
