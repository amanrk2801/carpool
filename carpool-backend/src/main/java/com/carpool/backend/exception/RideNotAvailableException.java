package com.carpool.backend.exception;

public class RideNotAvailableException extends RuntimeException {
    public RideNotAvailableException(String message) {
        super(message);
    }

    public RideNotAvailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
