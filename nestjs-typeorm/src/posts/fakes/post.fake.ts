import { Post } from '../entities/post.entity';
import { fakeUser } from '../../users/fakes/user.fake';

const fakePost = new Post();
fakePost.id = '970a35b0-079e-49e3-8d7e-582b279fe3eb';
fakePost.title = 'Hello World!';
fakePost.body = 'Lorem Ipsum';
fakePost.authorId = fakeUser.id;
fakePost.author = fakeUser;

export { fakePost };
