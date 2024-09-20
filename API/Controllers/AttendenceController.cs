using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Route("api/memberAttendence")]
    public class AttendenceController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public AttendenceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostAttendence([FromBody] AttendenceDto attendenceDto)
        {
            return Ok(attendenceDto);
        }
    }
}