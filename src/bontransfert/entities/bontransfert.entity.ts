import { BaseEntity } from "src/common/base-entity";
import { DepotEntity } from "src/depot/entities/depot.entity";
import { LignebontransfertEntity } from "src/lignebontransfert/entities/lignebontransfert.entity";
import { Column,  Entity, ManyToOne, OneToMany } from "typeorm";


@Entity('bon_transfert')
export class BontransfertEntity extends BaseEntity {

    @ManyToOne(()=>DepotEntity,(depot)=>depot.id,{nullable:false})
    depotSource:DepotEntity;

    @ManyToOne(()=>DepotEntity,(depot)=>depot.id,{nullable:false})
    depotDestination:DepotEntity;

    @Column()
    dateCreation:Date;


    @OneToMany(()=>LignebontransfertEntity,(ligne)=>ligne.bonTransfert)
    lignes:LignebontransfertEntity[];
}
