package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_review")
public class Review extends BaseEntity {
    private Boolean approved;
    private String message;

    @ManyToOne(cascade = CascadeType.ALL)
    private Implementation implementation;
    @ManyToOne(cascade = CascadeType.MERGE)
    private User user;
}
