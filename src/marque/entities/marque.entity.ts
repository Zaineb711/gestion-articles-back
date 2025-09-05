import { ArticleEntity } from "src/article/entities/article.entity";
import { BaseEntity } from "src/common/base-entity";
import { FamilleEntity } from "src/famille/entities/famille.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";




@Entity({name:'marque'})
export class MarqueEntity extends BaseEntity {
    @Column()
    designation:string;

    @ManyToOne(()=>FamilleEntity,(famille)=>famille.id,{nullable:true})
    idfamille?:FamilleEntity

    @OneToMany(() => ArticleEntity, article => article.marque)
    article: any[];
}
