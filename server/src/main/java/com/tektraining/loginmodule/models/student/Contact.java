package com.tektraining.loginmodule.models.student;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Contact {

    @NotBlank
    @Size(max = 10)
    private String phoneNumber;

    private String address;

    public Contact() {

    }

    public Contact(String phoneNumber, String address) {
        this.setPhoneNumber(phoneNumber);
        this.setAddress(address);
    }


    /**
     * @return String return the phoneNumber
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * @param phoneNumber the phoneNumber to set
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * @return String return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

}