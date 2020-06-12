package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_project")
public class Project extends BaseEntity{

    private String name;
    private String description;
    private String image;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<Feature> features;
    @ManyToOne(cascade = CascadeType.MERGE)
    private User user;
}
