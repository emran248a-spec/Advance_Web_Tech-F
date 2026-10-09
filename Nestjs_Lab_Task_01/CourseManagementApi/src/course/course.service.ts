import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    getAllCourses() : string 
    {
        return 'Get all courses from service';
    }

    getCourseById(id : string) :string 
    {
        return `get course with ID : ${id} from service`;
    }

    createCourse() : string
    {
        return 'create course from service';
    }

    updateCourse(id: string) : string
    {
        return `update course ${id} from service`;
    }

    patchCourse(id: string) :string
    {
        return `patch ${id} from service`;
    }

    deleteCourse(id: string) : string
    {
        return `delete course ${id} from service`;
    }

}
