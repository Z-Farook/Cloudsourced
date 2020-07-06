package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_feature")
public class Feature extends BaseEntity {

    private String name;
    @Length(max = 50000)
    private String description;
    @Length(max = 50000)
    private String codePreview;
    private String codeLanguage;
    private Long points;
    private Instant finishedAt;
    private Instant archivedAt;

//    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "feature")
//    private List<Implementation> implementations;
    @ManyToOne(cascade = CascadeType.MERGE)
    private Project project;
}
