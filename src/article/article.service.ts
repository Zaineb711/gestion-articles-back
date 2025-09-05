import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { Repository } from 'typeorm';
import { TvaEntity } from 'src/tva/entities/tva.entity';
import { FamilleEntity } from 'src/famille/entities/famille.entity';
import { MarqueEntity } from 'src/marque/entities/marque.entity';
import { ModeleEntity } from 'src/modele/entities/modele.entity';
import { UnitearticleEntity } from 'src/unitearticle/entities/unitearticle.entity';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity)private readonly articleRepository:Repository<ArticleEntity>,
  @InjectRepository(TvaEntity) private readonly tvaRepository :Repository<TvaEntity>,
  @InjectRepository(FamilleEntity) private readonly familleRepository :Repository<FamilleEntity>,
  @InjectRepository(MarqueEntity) private readonly marqueRepository :Repository<MarqueEntity>,
  @InjectRepository(ModeleEntity) private readonly modeleRepository :Repository<ModeleEntity>,
  @InjectRepository(UnitearticleEntity) private readonly unitearticleRepository :Repository<UnitearticleEntity>

){}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const {tvaId,familleId,marqueId,modeleId,uniteArticleId}=createArticleDto;
    
    const tva=await this.tvaRepository.findOneBy({id:tvaId});
    if (!tva) throw new NotFoundException(`tva with id ${tvaId} not found `);

    const famille=await this.familleRepository.findOneBy({id:familleId});
    if (!famille) throw new NotFoundException(`famille with  id ${familleId} is found`);

    const marque= await this.marqueRepository.findOneBy({id:marqueId});
    if (!marque) throw new NotFoundException(`marque with id ${marqueId} not found`);

    const modele =await this.modeleRepository.findOneBy({id:modeleId});
    if (!modele) throw new NotFoundException(`modele with id ${modeleId} not found`);

    const uniteArticle=await this.unitearticleRepository.findOneBy({id:uniteArticleId});
    if(!uniteArticle) throw new NotFoundException(`uniteArticle id ${uniteArticleId} not found `)
      const article=this.articleRepository.create({
        designation: createArticleDto.designation,
        prixAchatHT: createArticleDto.prixAchatHT,
        prixVenteHT: createArticleDto.prixVenteHT,
        stockable: createArticleDto.stockable,
        reference: createArticleDto.reference,
        tva,
        famille,
        marque,
        modele,
        uniteArticle,
  });
  return await this.articleRepository.save(article);
    
    
  }

  async findAll() : Promise<ArticleEntity[]>{
    return await this.articleRepository.find({
      relations:['tva','famille','marque','modele','uniteArticle'],
    });
  }

  async findOne(id: number) : Promise<ArticleEntity | null>{
    return await this.articleRepository.findOne({
      where:{id},
      relations:['tva','famille','marque','modele','uniteArticle'],});
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) : Promise<ArticleEntity | null>{
    await this.articleRepository.update(id,updateArticleDto);
    return await this.articleRepository.findOne({where:{id},
      relations:['tva','famille','marque','modele','uniteArticle'],});
  }

  async remove(id: number) : Promise<void>{
    await this.articleRepository.delete(id);
  }
}
