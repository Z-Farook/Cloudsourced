package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Getter;
import javax.persistence.*;
import java.time.Instant;

@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    private Instant createdAt;
    @Getter
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt =  Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt =  Instant.now();
    }
}
