import { ArticleEntity } from "src/article/entities/article.entity";
import { BaseEntity } from "src/common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";



@Entity({name:"tva"})
export class TvaEntity  extends BaseEntity{
    @Column({ type: "decimal", precision: 5, scale: 2 })
    tax: number;

    @OneToMany(() => ArticleEntity, article => article.tva)
    article: any[];
}
