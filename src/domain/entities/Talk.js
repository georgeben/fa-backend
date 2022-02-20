import slugify from "slugify";

class Talk {
  static async generateSlug(string) {
    const slug = slugify(string, {
      lower: true,
      strict: true,
    });
    const count = await this.countDocuments({ name: string });
    if (!count) {
      return slug;
    }
    return `${slug}-${String(count).padStart(4, 0)}`;
  }
}

export default Talk;
