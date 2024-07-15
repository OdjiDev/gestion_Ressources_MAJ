package com.odji.spring_back_end.vcs.repository;


        import jakarta.persistence.Entity;
        import jakarta.persistence.Id;
        import jakarta.persistence.Table;
        import lombok.AllArgsConstructor;
        import lombok.Builder;
        import lombok.Data;
        import lombok.NoArgsConstructor;

        import java.io.Serializable;
        import java.util.List;
@Data
@Builder
@Entity
@Table(name = "commit")
//@AllArgsConstructor
@NoArgsConstructor
public class Commit implements Serializable {
    private String id;
    private String message;
    private List<String> files;
    private Commit parent;

    public Commit(String id, String message, List<String> files, Commit parent) {
        this.id = id;
        this.message = message;
        this.files = files;
        this.parent = parent;
    }


    // Getters et setters
}
