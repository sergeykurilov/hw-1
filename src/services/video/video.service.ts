import { inject, injectable } from "inversify";
import {
  IReturnVideoServiceType,
  IVideoService,
} from "./video.service.interface";
import { VideoModel } from "../../types/videos";
import { CreateVideoDto } from "../../controllers/video/dto/create-video.dto";
import { UpdateVideoType } from "../../controllers/video/dto/update-video.dto";
import { IVideoRepository } from "../../repositories/video/video.repository.interface";
import { SERVICE_IDENTIFIER } from "../../../common/consts/service-identifiers";
import { VideoValidator } from "./video.validation";

@injectable()
export class VideoService implements IVideoService {
  constructor(
    @inject(SERVICE_IDENTIFIER.VideoRepository)
    private videoRepository: IVideoRepository,
  ) {}

  async createVideo(
    videoDto: CreateVideoDto,
  ): Promise<IReturnVideoServiceType> {
    try {
      const errors = VideoValidator.validateCreateVideo(videoDto);
      if (errors.length) return { errors, video: null };

      return { errors, video: await this.videoRepository.create(videoDto) };
    } catch (error) {
      throw new Error(`Error while creating video`);
    }
  }

  deleteAll(): Promise<void> {
    try {
      return this.videoRepository.deleteAll();
    } catch (e) {
      throw new Error(`Error while deleting videos`);
    }
  }

  deleteById(id: number): Promise<boolean> {
    try {
      return this.videoRepository.deleteById(id);
    } catch (e) {
      throw new Error(`Error while deleting videos`);
    }
  }

  findAll(): Promise<VideoModel[]> {
    try {
      return this.videoRepository.findAll();
    } catch (e) {
      throw new Error(`Error while searching for videos`);
    }
  }

  findById(id: number): Promise<VideoModel | null> {
    try {
      return this.videoRepository.findById(id);
    } catch (e) {
      throw new Error(`Error while searching for videos`);
    }
  }

  async updateVideo(
    id: number,
    updatedVideo: UpdateVideoType,
  ): Promise<IReturnVideoServiceType> {
    try {
      const errors = VideoValidator.validateUpdateVideo(updatedVideo);
      if (errors.length) return { errors, video: null };

      return {
        errors,
        video: await this.videoRepository.update(id, updatedVideo),
      };
    } catch (error) {
      throw new Error(`Error while updating video`);
    }
  }
}
