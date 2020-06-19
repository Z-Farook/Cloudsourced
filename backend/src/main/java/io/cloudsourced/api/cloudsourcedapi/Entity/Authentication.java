package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name="tbl_authentication")
public class Authentication extends BaseEntity{

    private String token;
    @Setter(AccessLevel.NONE)
    private Instant expireDate;

    @PreUpdate
    protected void onUpdate() {
        expireDate =  Instant.now().plus(7, ChronoUnit.DAYS);
    }
}
