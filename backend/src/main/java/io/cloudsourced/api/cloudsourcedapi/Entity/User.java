package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="tbl_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

}
