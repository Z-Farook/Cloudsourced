package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "tbl_transation")
public class Transaction extends BaseEntity{
    private long points;
    @ManyToOne(cascade = CascadeType.MERGE)
    private User user;
    @OneToOne(cascade = CascadeType.MERGE)
    private Implementation implementation;
}
