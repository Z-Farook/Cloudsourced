package io.cloudsourced.api.cloudsourcedapi.Entity;

import com.sun.istack.Pool;
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
}
