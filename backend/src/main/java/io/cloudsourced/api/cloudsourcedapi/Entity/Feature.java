package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_feature")
public class Feature extends BaseEntity {

    private String name;
    private String description;
    private String codePreview;
    private String codeLanguage;
}
