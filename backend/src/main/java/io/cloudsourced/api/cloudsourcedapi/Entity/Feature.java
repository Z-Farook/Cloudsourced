package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="tbl_feature")
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;
    private String description;
    private String codePreview;
    private String codeLanguage;
}
