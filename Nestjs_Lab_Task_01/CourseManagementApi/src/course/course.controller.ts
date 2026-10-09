import { Controller, Get, Put, Patch, 
    Delete, Param,
    Post,
  } from '@nestjs/common';
import { CourseService } from './course.service.js';

@Controller('course')
export class CourseController 
{
    constructor(private readonly courseSerive: CourseService){}

    @Get()
    getAllCourses(): string
    {
        return this.courseSerive.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') id: string): string
    {
        return this.courseSerive.getCourseById(id);
    }

    @Post()
    createCourse(): string
    {
        return this.courseSerive.createCourse();
    }

    @Put(':id')
    updateCourse(@Param('id') id: string): string
    {
        return this.courseSerive.updateCourse(id);
    }

    @Patch(':id')
    patchCourse(@Param('id') id: string): string
    {
        return this.courseSerive.patchCourse(id);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id: string): string
    {
        return this.courseSerive.deleteCourse(id);
    }
}
