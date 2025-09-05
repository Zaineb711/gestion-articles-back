import { ArticleEntity } from "src/article/entities/article.entity";
import { BaseEntity } from "src/common/base-entity";
import { MarqueEntity } from "src/marque/entities/marque.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";



@Entity({name:"modeles"})
export class ModeleEntity extends BaseEntity{

    @Column()
    designation:string ;

    @ManyToOne(()=> MarqueEntity,(marque)=>marque.id,{nullable:true})
    idmarque?: MarqueEntity;

    @OneToMany(() => ArticleEntity, article => article.modele)
    article: any[];
    
}
