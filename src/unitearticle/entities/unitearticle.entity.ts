import { ArticleEntity } from "src/article/entities/article.entity";
import { BaseEntity } from "src/common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";



@Entity({name:'unite_articles'})
export class UnitearticleEntity extends BaseEntity{
    @Column()
    libelle:string;

    @OneToMany(() => ArticleEntity, article => article.uniteArticle)
    article: any[];
}
