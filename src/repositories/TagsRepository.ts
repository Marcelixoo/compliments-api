import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

/**
 * For now we're not adding any behavior to the repositories.
 * However, it's better to start with the abstractions in place
 * instead of creating one when the need arrives.
 */

@EntityRepository(Tag)
class TagsRepository extends Repository<Tag> { }

export { TagsRepository }