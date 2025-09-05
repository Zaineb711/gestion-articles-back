import { Exclude } from "class-transformer";
import { ArticleEntity } from "src/article/entities/article.entity";
import { BontransfertEntity } from "src/bontransfert/entities/bontransfert.entity";
import { BaseEntity } from "src/common/base-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('Ligne_bontransfert')
export class LignebontransfertEntity extends BaseEntity {


    @Column({type:'decimal',precision:10,scale:2,default:0})
    quantity:number;

    @Column({type:'decimal',precision:10,scale:2,default:0})
    prixUnitaireHt:number;

    
    @ManyToOne(() => BontransfertEntity, (bonTransfert) => bonTransfert.lignes, { nullable: true})
    @JoinColumn({ name: "bonTransfertId" })
    @Exclude() // Exclude this property from JSON serialization to break the circular reference
    bonTransfert: BontransfertEntity;

    @ManyToOne(() => ArticleEntity, (article) => article.id, { nullable: false })
    article: ArticleEntity;
}
