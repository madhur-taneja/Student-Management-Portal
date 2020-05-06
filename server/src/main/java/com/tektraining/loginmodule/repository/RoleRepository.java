package com.tektraining.loginmodule.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tektraining.loginmodule.models.user.ERole;
import  com.tektraining.loginmodule.models.user.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
