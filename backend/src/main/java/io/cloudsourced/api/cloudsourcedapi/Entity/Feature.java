package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_feature")
public class Feature extends BaseEntity {

    private String name;
    private String description;
    private String codePreview;
    private String codeLanguage;
    private Long points;
    private Instant finishedAt;
    private Instant archivedAt;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "feature")
    private List<Implementation> implementations;
    @ManyToOne(cascade = CascadeType.ALL)
    private Project project;
}
