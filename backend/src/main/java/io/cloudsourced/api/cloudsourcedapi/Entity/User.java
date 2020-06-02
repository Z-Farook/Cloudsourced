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
    private String email;
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Implementation> implementations;

    @OneToOne(cascade = CascadeType.ALL)
    private Authentication authentication;

    public User(){
        authentication = new Authentication();
    }

}
