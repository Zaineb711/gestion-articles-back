import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity{
        @PrimaryGeneratedColumn()
        id:number;
    
        @CreateDateColumn()
        createdDatetime?: Date;
    
        @UpdateDateColumn()
        updatedDatetime?: Date;
    
        @Column({ nullable: true })
        createdBy?: number;
    
        @Column({ nullable: true })
        updatedBy?: number;

}