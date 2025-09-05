import { BaseEntity } from "src/common/base-entity";
import { FamilleEntity } from "src/famille/entities/famille.entity";
import { MarqueEntity } from "src/marque/entities/marque.entity";
import { ModeleEntity } from "src/modele/entities/modele.entity";
import { TvaEntity } from "src/tva/entities/tva.entity";
import {  UnitearticleEntity } from "src/unitearticle/entities/unitearticle.entity";
import {  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";



@Entity({name:'article'})
export class ArticleEntity extends BaseEntity{
    
    @Column()
    designation:string;

    @Column({ nullable: true })
    reference:string;

    @Column({type:'decimal',precision:10,scale:2,default:0})
    prixAchatHT?:number;

    
    @Column({type:'decimal',precision:10,scale:2,default:0})
    prixVenteHT?:number;

    @ManyToOne(()=>TvaEntity, (tva) => tva.article)
    @JoinColumn({name:'tvaId'})
    tva?:TvaEntity;
    

    @ManyToOne(() => FamilleEntity,famille=>famille.article)
    @JoinColumn({name:'familleId'})
    famille: FamilleEntity;

    @Column({ default: true })
    stockable?: boolean;

    @ManyToOne(()=>MarqueEntity, (marque) => marque.article, { nullable: true })
    @JoinColumn({name:'marqueId'})
    marque?:MarqueEntity;

    @ManyToOne(()=>ModeleEntity, (modele) => modele.article, { nullable: true })
    @JoinColumn({name:'modeleId'})
    modele?:ModeleEntity;

    @ManyToOne(()=>UnitearticleEntity, (unite) => unite.article, { nullable: true })
    @JoinColumn({name:'uniteArticleId'})
    uniteArticle?:UnitearticleEntity;
}





