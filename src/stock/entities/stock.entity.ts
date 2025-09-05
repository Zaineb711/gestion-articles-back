import { ArticleEntity } from "src/article/entities/article.entity";
import { BaseEntity } from "src/common/base-entity";
import { DepotEntity } from "src/depot/entities/depot.entity";
import { Column, Entity, ManyToOne } from "typeorm";



@Entity('stock')
export class StockEntity extends BaseEntity {
    

    @Column({type:'decimal',precision:10,scale:2,default:0})
    qte:number;

    @Column({type:'decimal',precision:10,scale:2,default:0})
    qteminimal:number;

    @Column({type:'decimal',precision:10,scale:2,default:0})
    qtemaximal:number;

    @ManyToOne(()=>DepotEntity,(depot)=>depot.id,{nullable:false})
    depot:DepotEntity;

    @ManyToOne(()=>ArticleEntity,(article)=>article.id,{nullable:false})
    article:ArticleEntity;
    
}
