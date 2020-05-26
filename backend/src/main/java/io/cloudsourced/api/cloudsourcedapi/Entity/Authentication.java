package io.cloudsourced.api.cloudsourcedapi.Entity;

import jdk.jfr.Enabled;
import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.OneToOne;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@EqualsAndHashCode(callSuper = true)
@Enabled
@Data
@Table(name="tbl_feature")
public class Authentication extends BaseEntity{

    @OneToOne(cascade = CascadeType.ALL)
    private User user;
    private String token;
    @Setter(AccessLevel.NONE)
    private Instant ExpireDate;

    @PreUpdate
    protected void onUpdate() {
        ExpireDate =  Instant.now().plus(5, ChronoUnit.MINUTES);
    }
}
