package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="tbl_user")
public class User extends BaseEntity{

    private String name;
    private String infix;
    private String lastName;
    private String[] languages;
    private String country;
    private String email;
    private String password;
    private String telephone;
    private String street;
    private String streetNumber;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Project> projects;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Implementation> implementations;

    @OneToOne(cascade = CascadeType.ALL)
    private Authentication authentication;

    public User(){
        authentication = new Authentication();
    }

}
