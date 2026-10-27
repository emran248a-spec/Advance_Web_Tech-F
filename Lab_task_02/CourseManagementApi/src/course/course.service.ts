import { BadRequestException, Injectable } from '@nestjs/common';
import type { Express } from 'express';

import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CourseService {
  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: [],
    };
  }

  getCourseById(id: string) {
    return {
      message: 'Course fetched successfully',
      id: id,
    };
  }

  createCourse(dto: CreateCourseDto) {
    return {
      message: 'Course created successfully',
      data: dto,
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    return {
      message: 'Course updated successfully',
      id: id,
      data: dto,
    };
  }

  patchCourse(id: string, dto: UpdateCourseDto) {
    return {
      message: 'Course patched successfully',
      id: id,
      updatedFields: Object.keys(dto).filter(
        (key) => dto[key as keyof UpdateCourseDto] !== undefined,
      ),
    };
  }

  deleteCourse(id: string) {
    return {
      message: 'Course deleted successfully',
      id: id,
    };
  }

  uploadCourseMaterial(
    id: string,
    file: Express.Multer.File | undefined,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Please upload a file using the form-data key "file".',
      );
    }

    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: file.path.replace(/\\/g, '/'),
    };
  }
}