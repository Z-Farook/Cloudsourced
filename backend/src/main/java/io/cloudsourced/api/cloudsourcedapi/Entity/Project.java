package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_project")
public class Project extends BaseEntity{

    private String name;
    private String description;
    private String image;
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
}
