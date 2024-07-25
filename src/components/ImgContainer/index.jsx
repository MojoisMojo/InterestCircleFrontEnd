// export default function ImgContainer() {
//   return (
//     <Grid item container
//       rowSpacing={{ xs: 1, md: 1.5 }}
//       columnSpacing={{ xs: 1, md: 1.5 }}
//       paddingTop='8px !important'
//       sx={{ width: '100%' }}
//     >
//       {post.img.map((img) => (
//         <Grid item
//           xs={6}
//           sm={4}
//         >
//           <SquareContainer
//             item
//             key={img.id}
//           >
//             <ButtonBase
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: { xs: '5px', sm: '10px' },
//               }}
//               onClick={() => handleClickOpenImg(img)}
//             >
//               {/* <Img
//             alt="img"
//             src={img}
//             sx={{
//               width: '100%',
//               height: 'auto',
//               borderRadius: 'inherit',
//               objectFit: 'cotain',
//               overflow: 'hidden',
//             }}
//           /> */}
//               <img
//                 src={img}
//                 alt="img"
//                 style={{ borderRadius: 'inherit', objectFit: 'cover', width: '100%', height: '100%' }}
//               />
//             </ButtonBase>
//           </SquareContainer>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }
