package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="tbl_user")
public class User {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    private String name;

}
