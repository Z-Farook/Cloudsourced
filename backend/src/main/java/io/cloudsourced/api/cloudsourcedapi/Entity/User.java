package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.*;

import javax.persistence.*;

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
    @OneToOne(cascade = CascadeType.ALL)
    private Authentication authentication;

    public User(){
        authentication = new Authentication();
    }
}
