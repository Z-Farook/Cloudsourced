package io.cloudsourced.api.cloudsourcedapi.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tbl_transation")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long points;
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
}