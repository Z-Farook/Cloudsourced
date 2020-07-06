package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_review")
public class Review extends BaseEntity {
    @Length(max = 50000)
    private String message;

    @ManyToOne(cascade = CascadeType.ALL)
    private Implementation implementation;
    @ManyToOne(cascade = CascadeType.MERGE)
    private User user;
}
