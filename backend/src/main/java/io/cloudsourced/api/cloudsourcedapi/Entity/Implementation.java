package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "tbl_implementation")
public class Implementation extends BaseEntity {
    private String code;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
    @ManyToOne(cascade = CascadeType.ALL)
    private Feature feature;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "implementation", fetch = FetchType.LAZY)
    private List<Review> reviews;
}
