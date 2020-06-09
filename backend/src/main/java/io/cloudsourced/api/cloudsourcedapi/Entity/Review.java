package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@Table(name="tbl_review")
public class Review extends BaseEntity {
    private Boolean approved;
    private String message;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Implementation implementation;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
}
