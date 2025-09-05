import { BaseEntity } from "src/common/base-entity";
import { StockEntity } from "src/stock/entities/stock.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity({name:'depot'})
export class DepotEntity extends BaseEntity {

    @Column()
    designation:string;

    @Column()
    address:string;
    
    @OneToMany(()=>StockEntity,(stock)=>stock.depot)
    stocks:StockEntity[]

}
