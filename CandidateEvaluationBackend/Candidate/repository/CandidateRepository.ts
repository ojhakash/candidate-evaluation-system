import CandidateModel from "../../Common/Models/Candidate";
import Candidate from "../../domain/entities/Candidate";
import Attachment from "../../Common/Models/Attachment";
import HttpError from "standard-http-error";
import DatabaseConnector from "../../utils/DatabaseConnector/DatabaseConnector";
import Location from "../../domain/valuedObjects/Location";
import Comment from "../../domain/valuedObjects/Comment";
import Rating from "../../domain/valuedObjects/Rating";
import CommentModel from "../../Common/Models/Comment";
import RatingModel from "../../Common/Models/Rating";
import Admin from "../../Common/Models/Admin";

export default class CandidateRepository {
  constructor() {}

  async addNewCandidate(candidate: Candidate) {
    try {
      const result = await DatabaseConnector.sequelize.transaction(
        async (t) => {
          const candidateModel = CandidateModel.create(
            {
              email: candidate.email,
              name: candidate.name,
              web_address: candidate.webAddress,
              cover_letter: candidate.coverLetter,
              fond_of_working: candidate.fondOfWorking,
              ip: candidate.ip,
              location: `${candidate.location.area}, ${candidate.location.city},${candidate.location.country}`,
            },
            { transaction: t }
          );

          const attachmentModel = await Attachment.create(
            {
              attachment: candidate.attachemnt,
              candidateEmail: candidate.email,
            },
            { transaction: t }
          );
        }
      );
    } catch (error) {
      if (error.errors && error.errors[0]["validatorKey"] == "not_unique") {
        throw new HttpError(400, `${error.errors[0]["path"]} already exists.`);
      } else {
        throw new HttpError(400, "validation error");
      }
    }
  }

  async getCandidates(rating: any) {
    let candidateWithAttachments = [];
    
    if (!rating || rating == 0) {
      candidateWithAttachments = await CandidateModel.findAll({
        include: [
          {
            model: Attachment,
            required: true,
          },
        ],
      });
    } else {
      candidateWithAttachments = await CandidateModel.findAll({
        include: [
          {
            model: Attachment,
            required: true,
          },
          {
            model: RatingModel,
            // right: true,
            where: { rating: rating },
            attributes: ["rating", "created_at"],
            include: [{ model: Admin, attributes: ["name", "email"] }],
          },
        ],
      });
    }
    let candidates: Candidate[] = candidateWithAttachments.map((value) => {
      let attachment: any = value.get("attachment");
      let name: any = value.get("name");
      let email: any = value.get("email");
      let webAddress: any = value.get("web_address");
      let coverLetter: any = value.get("cover_letter");
      let attachmentBuffer: any = attachment.get("attachment");
      let fondOfWorking: any = value.get("fond_of_working");
      let ip: any = value.get("ip");
      let location: any = value.get("location");
      return new Candidate(
        name,
        email,
        webAddress,
        coverLetter,
        attachment.get("attachment").toString(),
        fondOfWorking,
        ip,
        new Location(
          location.split(",")[2],
          location.split(",")[1],
          location.split(",")[0]
        )
      );
    });
    return candidates;
  }

  async getCandidateById(candidateEmail: string) {
    let candidate = await CandidateModel.findOne({
      where: { email: candidateEmail },
      attributes: [
        "email",
        "name",
        "web_address",
        "cover_letter",
        "fond_of_working",
        "ip",
        "location",
        "created_at",
      ],
      include: [
        {
          model: CommentModel,
          // right: true,
          attributes: ["commentText", "created_at", "comment_id"],
          include: [{ model: Admin, attributes: ["name", "email"] }],
        },
        {
          model: RatingModel,
          // right: true,
          // where: {rating: 4},
          attributes: ["rating", "created_at"],
          include: [{ model: Admin, attributes: ["name", "email"] }],
        },
      ],
    });

    return JSON.parse(JSON.stringify(candidate, null, 2));
  }

  async addCommentToCandidateByCandidateId(comment: Comment) {
    let model = CommentModel.build({
      adminAdminId: comment.adminId,
      candidateEmail: comment.candidateId,
      commentText: comment.commentText,
    });
    await model.save();
  }

  async addRatingToCandidateByCandidateId(rating: Rating) {
    let ratingObj = await RatingModel.findOne({
      where: {
        adminAdminId: rating.adminId,
        candidateEmail: rating.candidateId,
      },
    });
    if (!ratingObj) {
      let model = RatingModel.build({
        adminAdminId: rating.adminId,
        candidateEmail: rating.candidateId,
        rating: rating.ratedValue,
      });
      await model.save();
    } else {
      ratingObj.set("rating", rating.ratedValue);
      await ratingObj.save();
    }
  }
}
