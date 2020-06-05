package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "tbl_implementation")
public class Implementation extends BaseEntity {
    private String code;
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
}
