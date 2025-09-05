import { ArticleEntity } from "src/article/entities/article.entity";
import { BaseEntity } from "src/common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";



@Entity({name:'familles'})
export class FamilleEntity extends BaseEntity {

    @Column()
    designation: string;

    @OneToMany(() => ArticleEntity, article => article.famille)
    article: any[];
}
